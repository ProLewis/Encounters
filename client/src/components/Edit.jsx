import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Form, FormGroup, Input, Label, Nav, NavItem, TabContent, TabPane, NavLink, Row, Col } from 'reactstrap'


const Edit = () => {
    const [encounterName, setEncounterName] = useState("");
    const [encounterMonsters, setEncounterMonsters] = useState([]);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [rewards, setRewards] = useState("");
    /*const [campaign, setCampaign] = useState("");*/
    /*const [party, setParty] = useState([]);*/
    const [errors, setErrors] = useState([]);
    const [currentActiveTab, setCurrentActiveTab] = useState("1");

    class Monster {
        constructor(name, size, type, CR, XP) {
            this.name = name;
            this.size = size;
            this.type = type;
            this.CR = CR;
            this.XP = XP;
        }
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/encounters/${id}`)
            .then(res => {
                console.log(res.data);
                setEncounterName(res.data.encounterName);
                setEncounterMonsters(res.data.encounterMonsters);
                setSummary(res.data.summary);
                setDescription(res.data.description);
                setRewards(res.data.rewards);

            })
            .catch(err => console.error(err));
    }, [id]);

    const ancientGoldDragon = new Monster("Ancient Gold Dragon", "Gargantuan", "Dragon", 24, 62000);
    const adultBlackDragon = new Monster("Adult Black Dragon", "Huge", "Dragon", 14, 11500);
    const hydra = new Monster("Hydra", "Huge", "Monstrosity", 8, 3900);
    const stoneGiant = new Monster("Stone Giant", "Huge", "Giant", 7, 2900);
    const youngBrassDragon = new Monster("Young Brass Dragon", "Large", "Dragon", 6, 2300);
    const triceratops = new Monster("Triceratops", "Huge", "Beast", 5, 1800);
    const ghost = new Monster("Ghost", "Medium", "Undead", 4, 1100);
    const owlbear = new Monster("Owlbear", "Large", "Monstrosity", 3, 700);
    const mimic = new Monster("Mimic", "Medium", "Monstrosity", 2, 450);
    const direWolf = new Monster("Dire Wolf", "Large", "Beast", 1, 200);
    const gnoll = new Monster("Gnoll", "Medium", "Humanoid", 0.5, 100);
    const goblin = new Monster("Goblin", "Small", "Humanoid", 0.25, 50);

    const monsters = [ancientGoldDragon, adultBlackDragon, hydra, stoneGiant, youngBrassDragon, triceratops, ghost, owlbear, mimic, direWolf, gnoll, goblin];

    const addMonster = (monster) => {
        let tempArr = encounterMonsters;
        tempArr.push(monster);
        setEncounterMonsters(tempArr);
        navigate(`/encounters/${id}/edit`);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/encounters/${id}`, {
            encounterName,
            encounterMonsters,
            summary,
            description,
            rewards
        })
            .then(res => {
                console.log(res);
                console.log("Form has been submitted");
                navigate("/my-encounters");
            })
            .catch(err => {
                const errRes = err.response.data.errors;
                console.log(errRes);
                const errorArr = [];
                for (const key of Object.keys(errRes)) {
                    errorArr.push(errRes[key].message);
                }
                setErrors(errorArr);
            })
    }

    const toggle = (tab) => {
        if (currentActiveTab !== tab) {
            setCurrentActiveTab(tab);
        }
    }

    return (
        <div>
            <Container>
                {/* {JSON.stringify(encounterMonsters)} */}
                <br />
                {/* {JSON.stringify(encounterName)} */}


                <Form onSubmit={submitHandler}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <Link to="/my-encounters"><button>My Encounters</button></Link>
                    <FormGroup floating>
                        <Input
                            name="encounterName"
                            type="text"
                            placeholder="Name Your Encounter"
                            onChange={(e) => setEncounterName(e.target.value)}
                            value={encounterName}
                        />
                        <Label for="encounterName">Name Your Encounter</Label>
                    </FormGroup>
                    <Input type="submit" />
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className="active"
                                onClick={() => { toggle('1'); }}
                            >
                                Monsters
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className=""
                                onClick={() => { toggle('2'); }}
                            >
                                Summary
                            </NavLink>
                        </NavItem>
                    </Nav>


                    <TabContent activeTab={currentActiveTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col>
                                    <Table striped hover bordered>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Size</th>
                                                <th>CR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monsters.map((monster, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{monster.name}</td>
                                                        <td>{monster.type}</td>
                                                        <td>{monster.size}</td>
                                                        <td>{monster.CR}</td>
                                                        <td><button type="button" onClick={() => addMonster({ monster })}>Add</button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Label for="summary">Short Summary</Label>
                            <Input
                                name="summary"
                                type="textarea"
                                placeholder="Short summary of your encounter..."
                                onChange={(e) => setSummary(e.target.value)}
                                value={summary}
                            />
                            <Label for="description">Encounter Description</Label>
                            <Input
                                name="description"
                                type="textarea"
                                placeholder="Describe in detail how your encounter will play out..."
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            <Label for="rewards">Treasure & Rewards</Label>
                            <Input
                                name="rewards"
                                type="textarea"
                                placeholder="Add in some of the super duper treasuuuuure..."
                                onChange={(e) => setRewards(e.target.value)}
                                value={rewards}
                            />
                        </TabPane>
                    </TabContent>
                </Form>
                {/*<div>
                {encounterMonsters.map((mon, index) =>{
                    return (
                        <div key = {index}>
                            <h3 >{mon.monster.name}</h3>
                        </div>
                    )
                })}
            </div>*/}
            </Container>
        </div>
    )
}

export default Edit