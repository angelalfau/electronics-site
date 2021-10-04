import { React, useState, useEffect } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";
import dark_background from "./icons/black-circuit.png";
import light_background from "./icons/light_circuit.jpg";
import "./recordList.css";

import DarkMode from "./darkMode";

const Record = (props) => (
    <tr>
        <td>{props.record.person_name}</td>
        <td>{props.record.person_position}</td>
        <td>{props.record.person_level}</td>
        <td>
            <Link to={"/edit/" + props.record._id}>Edit</Link> |
            <a
                href="/"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >
                Delete
            </a>
        </td>
    </tr>
);

const RecordList = () => {
    // This is the constructor that shall store our data retrieved from the database
    const [records, setRecords] = useState([]);
    const [dark, setDark] = useState();
    const isDark = DarkMode();
    // const [dark, setDark] = darkMode();

    // useEffect(() => {}, [dark]);

    // This method will get the data from the database.
    useEffect(() => {
        axios
            .get("http://localhost:5000/record/")
            .then((response) => {
                this.setState({ records: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // This method will delete a record based on the method
    const deleteRecord = (id) => {
        axios.delete("http://localhost:5000/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            record: this.state.records.filter((el) => el._id !== id),
        });
    };

    // This method will map out the users on the table
    const recordList = () => {
        return this.state.records.map((currentrecord) => {
            return (
                <Record
                    record={currentrecord}
                    deleteRecord={this.deleteRecord}
                    key={currentrecord._id}
                />
            );
        });
    };

    // This following section will display the table with the records of individuals.
    return (
        <div
            style={
                isDark
                    ? { backgroundImage: `url(${dark_background})` }
                    : { backgroundImage: `url(${light_background})` }
            }
        >
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{records}</tbody>
            </table>
        </div>
    );
};

export default RecordList;
