import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, FormGroup, Input, Label, Nav, NavItem, TabContent, TabPane, NavLink, Row, Col, Container, Card, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button } from 'reactstrap'

const Builder = () => {
    const [encounterName, setEncounterName] = useState("");
    const [encounterMonsters, setEncounterMonsters] = useState([]);
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [rewards, setRewards] = useState("");
    const [campaign, setCampaign] = useState("");
    const [party, setParty] = useState([1, 1, 1, 1, 1]);
    const [avgLevel, setAvgLevel] = useState(0);
    const [difficulty, setDifficulty] = useState("Trivial");
    const [errors, setErrors] = useState([]);
    const [currentActiveTab, setCurrentActiveTab] = useState("1");
    const [exp, setExp] = useState(0);
    const [adjExp, setAdjExp] = useState(0);
    const [modal, setModal] = useState(false);
    const [easyExp, setEasyExp] = useState(0);
    const [medExp, setMedExp] = useState(0);
    const [hardExp, setHardExp] = useState(0);
    const [deadlyExp, setDeadlyExp] = useState(0);

    const navigate = useNavigate();

    class Monster {
        constructor(name, size, type, CR, XP) {
            this.name = name;
            this.size = size;
            this.type = type;
            this.CR = CR;
            this.XP = XP;
        }
    }

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
    
    const monsters = [ancientGoldDragon, adultBlackDragon, hydra, stoneGiant, youngBrassDragon, triceratops, ghost, owlbear, mimic, direWolf, gnoll, goblin ];
    
    const addMonster = (monster) => {
        let tempArr = encounterMonsters;
        tempArr.push(monster);
        setEncounterMonsters(tempArr);
        setExp(exp + monster.monster.XP);
        navigate("/encounter-builder");
    }
    
    const removeMonster = (monster) => {
        //TODO
    }
    
    
    useEffect(() => {
        const diffAdjuster = (adjExp) => {
            if (adjExp < easyExp) setDifficulty("Trivial");
            else if (adjExp < medExp) setDifficulty("Easy");
            else if( adjExp< hardExp) setDifficulty("Medium");
            else if (adjExp < deadlyExp) setDifficulty("Hard");
            else if (adjExp > deadlyExp) setDifficulty("Deadly");
        }
        diffAdjuster(adjExp);
    }, [adjExp])
    
    useEffect(() => {
        const expAdjuster = (encounterMonsters, exp) => {
            let numMonsters = encounterMonsters.length;
            let expMultiplier = 1;
            if (numMonsters === 2) {
                expMultiplier = 1.5;
            }
            else if (numMonsters > 2 && numMonsters < 7) {
                expMultiplier = 2;
            }
            else if (numMonsters > 6 && numMonsters < 11) {
                expMultiplier = 2.5;
            }
            else if (numMonsters > 10 && numMonsters < 15) {
                expMultiplier = 3;
            }
            else if (numMonsters > 14) {
                expMultiplier = 4;
            }
            setAdjExp(exp * expMultiplier);
        }
        expAdjuster(encounterMonsters, exp)
    }, [exp])
    
    
    useEffect(() => {
        const levelAvg = (party) => {
            let sum = 0;
            for (let character of party) {
                sum += character;
            }
            setAvgLevel(sum / party.length);
            return sum / party.length;
        }
        levelAvg(party);
        const diffXPAdjuster = (party => {
            let easyXP, medXP, hardXP, deadlyXP;
            easyXP = medXP = hardXP = deadlyXP = 0;
            for (let character of party) {
                easyXP += expTable[character-1]["easy"];
                medXP += expTable[character-1]["medium"];
                hardXP += expTable[character-1]["hard"];
                deadlyXP += expTable[character-1]["deadly"];
            }
            setEasyExp(easyXP);
            setMedExp(medXP);
            setHardExp(hardXP);
            setDeadlyExp(deadlyXP);
        })
        diffXPAdjuster(party);
    }, [party])
    
    
    const expTable = [
        { "easy": 25, "medium": 50, "hard": 75, "deadly": 100 } ,
        { "easy": 50, "medium": 100, "hard": 150, "deadly": 200 },
        { "easy": 75, "medium": 150, "hard": 225, "deadly": 400 },
        { "easy": 125, "medium": 250, "hard": 375, "deadly": 500 },
        { "easy": 250, "medium": 500, "hard": 750, "deadly": 1100 },
        { "easy": 300, "medium": 600, "hard": 900, "deadly": 1400 },
        { "easy": 350, "medium": 750, "hard": 1100, "deadly": 1700 },
        { "easy": 450, "medium": 900, "hard": 1400, "deadly": 2100 },
        { "easy": 550, "medium": 1100, "hard": 1600, "deadly": 2400 },
        { "easy": 600, "medium": 1200, "hard": 1900, "deadly": 2800 },
        { "easy": 800, "medium": 1600, "hard": 2400, "deadly": 3600 },
        { "easy": 1000, "medium": 2000, "hard": 3000, "deadly": 4500 },
        { "easy": 1100, "medium": 2200, "hard": 3400, "deadly": 5100 },
        { "easy": 1250, "medium": 2500, "hard": 3800, "deadly": 5700 },
        { "easy": 1400, "medium": 2800, "hard": 4300, "deadly": 6400 },
        { "easy": 1600, "medium": 3200, "hard": 4800, "deadly": 7200 },
        { "easy": 2000, "medium": 3900, "hard": 5900, "deadly": 8800 },
        { "easy": 2100, "medium": 4200, "hard": 6300, "deadly": 9500 },
        { "easy": 2400, "medium": 4900, "hard": 7300, "deadly": 10900 },
        { "easy": 2800, "medium": 5700, "hard": 8500, "deadly": 12700 },
    ]
    

    const adjustParty = (index, value) => {
        setParty(party => {
            return party.map((character, i) => {
                return i === index ? value : character
            })
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/encounters", {
            encounterName,
            encounterMonsters,
            summary,
            description,
            rewards,
            party,
            avgLevel,
            difficulty,
            exp,
            adjExp
        })
            .then(res => {
                console.log(res);
                console.log("Form has been submitted")
                navigate("/my-encounters")
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

    const toggleTab = (tab) => {
        if (currentActiveTab !== tab) {
            setCurrentActiveTab(tab);
        }
    }

    const toggleModal = () => setModal(!modal);


    return (
        <div>
            {/* {JSON.stringify(encounterMonsters)} */}
            <br />
            {/* {JSON.stringify(encounterName)} */}
            <Container>
                <Row>
                    <Col xs="9">

                        <Breadcrumb listTag="div">
                            <BreadcrumbItem
                                href="/my-encounters"
                                tag="a"
                            >
                                My Encounters
                            </BreadcrumbItem>
                            <BreadcrumbItem
                                active
                            >
                                Encounter Builder
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Form onSubmit={submitHandler}>
                            {errors.map((err, index) => <p key={index}>{err}</p>)}
                            <FormGroup floating>
                                <Input
                                    name="encounterName"
                                    type="text"
                                    placeholder="Name your encounter"
                                    onChange={(e) => setEncounterName(e.target.value)}
                                    value={encounterName}
                                />
                                <Label for="encounterName">Name your encounter</Label>
                            </FormGroup>
                            <Row>
                                <Col xs="5">
                                    <p># OF CHARACTERS: {party.length} | AVERAGE PARTY LEVEL: {avgLevel}</p>
                                </Col>
                                <Col xs="3">
                                    <Button onClick={toggleModal}>Manage Characters</Button>
                                </Col>
                            </Row>
                            <Modal isOpen={modal} toggle={toggleModal}>
                                <ModalHeader>
                                    <div>
                                        <h2>Manage Characters</h2>
                                        {/* <p>Select Preset: </p> */}
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <p># OF CHARACTERS: {party.length} | AVERAGE PARTY LEVEL: {avgLevel} </p>
                                    {/* {JSON.stringify(party)} */}
                                    {party.map((character, index) => {
                                        return (
                                            <div key={index}>
                                                <p>Level</p>
                                                <select onChange={(e) => adjustParty(index, parseInt(e.target.value))} value={character}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                </select>
                                            </div>
                                        )
                                    })}
                                </ModalBody>
                            </Modal>
                            <Nav tabs className="nav-justified">

                                <NavItem>
                                    <NavLink
                                        className="active"
                                        onClick={() => { toggleTab('1'); }}
                                    >
                                        Monsters
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => { toggleTab('2'); }}>
                                        Summary
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <Input className="float-right" type="submit" value="SAVE" />
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
                                    <h5 className="text-left mt-3">Short Summary</h5>
                                    <Input
                                        className="mb-3"
                                        name="summary"
                                        type="textarea"
                                        rows="3"
                                        placeholder="Short summary of your encounter..."
                                        onChange={(e) => setSummary(e.target.value)}
                                        value={summary}
                                    />
                                    <h5 className="text-left">Encounter Description</h5>
                                    <Input
                                        className="mb-3"
                                        name="description"
                                        type="textarea"
                                        rows="15"
                                        placeholder="Describe in detail how your encounter will play out..."
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    />
                                    <h5 className="text-left" >Treasure & Rewards</h5>
                                    <Input
                                        className="mb-3"
                                        name="rewards"
                                        type="textarea"
                                        rows="4"
                                        placeholder="Add in some of the super duper treasuuuuure..."
                                        onChange={(e) => setRewards(e.target.value)}
                                        value={rewards}
                                    />
                                </TabPane>
                            </TabContent>
                        </Form>
                    </Col>

                    <Col xs="3">
                        <div>
                            <h5>ENCOUNTER SUMMARY</h5>
                            <br></br>
                            <Row>
                                <Col className="text-left">
                                    <p>DIFFICULTY</p>
                                    <p>{difficulty}</p>
                                    <p>TOTAL XP</p>
                                    <p>{exp}</p>
                                    <p>ADJUSTED XP</p>
                                    <p>{adjExp}</p>
                                </Col>
                                <Col className="text-right">
                                    <p>EASY: {easyExp}</p>
                                    <p>MEDIUM: {medExp}</p>
                                    <p>HARD: {hardExp}</p>
                                    <p>DEADLY: {deadlyExp}</p>
                                    <p>DAILY BUDGET:</p>
                                </Col>
                            </Row>
                        </div>
                        {encounterMonsters.map((mon, index) => {
                            return (
                                <Card key={index}>
                                    <Row>
                                        <Col >
                                            <CardTitle tag="h5" className="text-left">{mon.monster.name}</CardTitle>
                                            <p className="text-left">{mon.monster.size} {mon.monster.type}</p>
                                        </Col>
                                        <Col>
                                            <p className="text-right">CR {mon.monster.CR}</p>
                                            <p className="text-right">{mon.monster.XP} XP</p>
                                        </Col>
                                    </Row>
                                </Card>

                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Builder