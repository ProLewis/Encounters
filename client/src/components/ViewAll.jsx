import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap'
import {format} from 'date-fns'

const ViewAll = () => {
    const [encounters, setEncounters] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/encounters")
            .then(res => setEncounters(res.data))
            .catch(err => console.log(err))
    }, [])

    const deleteEncounter = (id) => {
        axios.delete(`http://localhost:8000/api/encounters/${id}`)
            .then(res => {
                setEncounters(encounters.filter((encounter) => encounter._id !== id))
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Container>
                <header  className="header">
                    <Breadcrumb className="breadcrumb ms-3 pt-3" listTag="div">
                        <BreadcrumbItem active>
                            My Encounters
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Row>
                        <Col>
                            <h1 className='text-left ms-3 pb-3'>My Encounters</h1>
                        </Col>
                        <Col>
                            <Link className="float-right me-3" to="/encounter-builder"><button>CREATE NEW</button></Link>
                        </Col>
                    </Row>
                </header>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>CREATED</th>
                            <th>CAMPAIGN</th>
                            <th>DIFFICULTY</th>
                            <th>PLAYER LEVELS</th>
                            <th>LAST SAVED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encounters.map((encounter, index) => {
                            return (
                                <tr key={index}>
                                    <td>{encounter.encounterName}</td>
                                    <td>{format(new Date(encounter.createdAt), "MMMM dd yyyy")}</td>
                                    <td>{encounter.campaign}</td>
                                    <td>{encounter.difficulty}</td>
                                    <td>{`${encounter.party.length} level ${encounter.avgLevel}s`}</td>
                                    <td>{format(new Date(encounter.updatedAt), "MMMM dd yyyy HH:mm p")}</td>
                                    <td>
                                        <button onClick={() => deleteEncounter(encounter._id)}>Delete</button>
                                        <Link to={`/encounters/${encounter._id}/edit`}><button>Edit</button></Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default ViewAll