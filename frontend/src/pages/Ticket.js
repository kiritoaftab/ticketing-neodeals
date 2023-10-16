import React, { useState } from 'react';

function Ticket() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    area: '',
    title: '',
    category: 'Select category',
    description: '',
  });

  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setFormSubmitSuccess(true); // You can set this to true upon successful submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder=""
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-yellow-600 focus-border-yellow-600 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder=""
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-yellow-600 focus-border-yellow-600 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder=""
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-yellow-600 focus-border-yellow-600 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder=""
                required
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Area
              </label>
              <input
                type="text"
                name="area"
                id="area"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-yellow-600 focus-border-yellow-600 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder=""
                required
                value={formData.area}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-yellow-600 focus-border-yellow-600 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder="Ticket Title"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-yellow-600 focus-border-yellow-600 block w-full p-2.5 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Select category">Select category</option>
                <option value="development">Development</option>
                <option value="deployment">Deployment</option>
                <option value="cloud">Cloud</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="app-development">App Development</option>
                <option value="software-solutions">Software Solutions</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark-text-white">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus-ring-yellow-600 focus-border-yellow-600 dark-bg-gray-700 dark-border-gray-600 dark-placeholder-gray-400 dark-text-white dark-focus-ring-yellow-500 dark-focus-border-yellow-500"
                placeholder="Your description here"
                required
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg focus-ring-4 focus-ring-yellow-200 dark-focus-ring-yellow-900 hover-bg-yellow-600"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default Ticket;
