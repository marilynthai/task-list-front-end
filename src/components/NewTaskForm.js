import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const NewTaskForm = (props) => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const onChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.addTaskCallback(formData);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={onChange}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={onChange}
      />
      <input type="submit" value="Create New Task"></input>
    </form>
  );
};

NewTaskForm.propTypes = {
  addTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
