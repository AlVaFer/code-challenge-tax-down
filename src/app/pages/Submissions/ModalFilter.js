import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

const ModalFilter = ({ data, setFilteredSubm }) => {
  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [age, setAge] = useState([]);

  const filterByProperty = (type, property, data) => {
    return property.map((x) => data.filter((item) => item[type] === x)).shift();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    let finalSubm = data;
    if (name.length) finalSubm = filterByProperty("name", name, finalSubm);
    if (surname.length)
      finalSubm = filterByProperty("surname", surname, finalSubm);
    if (age.length) finalSubm = filterByProperty("age", age, finalSubm);
    setFilteredSubm(finalSubm);
  };

  const getOptions = (field) => 
     data.map((item) => {
      return { ...item, label: item[field], value: item[field] };
    });

  return (
    <>
      <div className="popup bg-white mt-4 shadow rounded border p-3">
        <form>
          <div className="multiselect w-100">
            <label className="label" style={{ paddingRight: '32px' }}>Name</label>
            <MultiSelect
              value={name}
              style={{ width: '200px' }}
              options={getOptions('name')}
              onChange={(e) => setName(e.value)}
              placeholder="Select name"
              filter={true}
            />
          </div>

          <div className="multiselect w-100">
            <label className="label"  style={{ paddingRight: '10px' }}>Surname</label>
            <MultiSelect
              value={surname}
              style={{ width: '200px' }}
              options={getOptions('surname')}
              onChange={(e) => setSurname(e.value)}
              placeholder="Select surname"
              filter={true}
            />
          </div>

          <div className="multiselect w-100">
            <label className="label pr-5">Age</label>
            <MultiSelect
              value={age}
              style={{ width: '200px'}}
              options={getOptions('age')}
              onChange={(e) => setAge(e.value)}
              placeholder="Select age"
              filter={true}
            />
          </div>

          <button
            className="btn btn-success w-40 mt-2"
            onClick={(e) => handleFilter(e)}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalFilter;
