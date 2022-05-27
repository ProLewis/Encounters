import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, FormGroup, Input, Label, Nav, NavItem, TabContent, TabPane, NavLink, Row, Col } from 'reactstrap'


const Edit = () => {
    const [encounterName, setEncounterName] = useState("");
    const [encounterMonsters, setEncounterMonsters] = useState([]);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [rewards, setRewards] = useState("");
    const [campaign, setCampaign] = useState("");
    const [party, setParty] = useState([]);
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

    const adultBlackDragon = new Monster("Adult Black Dragon", "Huge", "Dragon", 14, 11500);
    const goblin = new Monster("Goblin", "Small", "Humanoid", 0.25, 50);
    const direWolf = new Monster("Dire Wolf", "Large", "Beast", 1, 200);

    const monsters = [adultBlackDragon, goblin, direWolf];

    const addMonster = (monster) => {
        //console.log(monster)
        let tempArr = encounterMonsters;
        tempArr.push(monster);
        setEncounterMonsters(tempArr);
        // console.log("Monster here!");
        // console.log(encounterMonsters);
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
            <div>
                {encounterMonsters.map((mon, index) =>{
                    return (
                        <div key = {index}>
                            <h3 >{mon.monster.name}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Edit