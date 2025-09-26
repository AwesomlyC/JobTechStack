import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../styles/TextInput.css";
import "react-datepicker/dist/react-datepicker.css";
import DisplayParseResults from "./DisplayParseResults";
import LoadingSpinner from "./LoadingSpinner";
import { useUserContext } from "./UserProvider";

function TextInput() {
  const [userInput, setUserInput] = useState("");
  const [wordMap, setWordMap] = useState({});
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("Remote");
  const [dateOfSubmission, setDateOfSubmission] = useState(new Date()); // Calendar Icon
  const [jobTitle, setJobTitle] = useState(""); // Calendar Icon
  const [companyURL, setCompanyURL] = useState(""); // optional

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useUserContext();
  const modifyDate = (dateString) => {
    let [month, day, year] = dateString.split("/");

    if (month.length === 1) {
      month = "0" + month[0];
    }

    if (day.length === 1) {
      day = "0" + day[0];
    }

    return year + "/" + month + "/" + day;
  };

  const verifyUserInputDetails = () => {
    if (
      !userInput ||
      !companyName ||
      !companyLocation ||
      !jobTitle ||
      !companyURL
    ) {
      if (!userInput) {
        setErrorMessage("Missing Job's Description!");
      } else if (!companyName) {
        setErrorMessage("Missing Company's Name!");
      } else if (!jobTitle) {
        setErrorMessage("Missing Job's Title");
      } else if (!companyLocation) {
        setErrorMessage("Missing Job's Location");
      } else if (!companyURL.includes("http") || !companyURL.includes("www")) {
        setErrorMessage("Invalid Job's URL");
      }
      return false;
    }
    return true;
  };
  const submitChanges = async () => {
    if (!verifyUserInputDetails()) {
      return;
    }
    const data = {
      userInput,
      companyName: companyName.trimEnd().trimStart(),
      jobTitle: jobTitle.trimEnd().trimStart(),
      companyLocation: companyLocation.trimEnd().trimStart(),
      dateOfSubmission: modifyDate(
        dateOfSubmission.toLocaleDateString("en-US")
      ),
      companyURL: companyURL.trimEnd().trimStart(),
      userID: user.id,
    };
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/input/parse`, {
        params: data,
      })
      .then((res) => {
        setWordMap(res.data);
        resetFields();
      })
      .catch((error) => {
        console.error("error occurred:", error);
      });
    setIsLoading(false);
  };

  const resetFields = () => {
    setUserInput("");
    setCompanyName("");
    setCompanyLocation("Remote");
    setJobTitle("");
    setCompanyURL("");
    setDateOfSubmission(new Date());
    setErrorMessage("");
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className="text-container">
      <div class="container">
        <div class="row">
          <div class="form-control">
            <label className="label-description">Company Name</label>
            <input
              className="company-information"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              required
            />
          </div>
          <div class="form-control">
            <label className="label-description">Job Title</label>
            <input
              className="company-information"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="form-control">
            <label className="label-description">Location</label>
            <select
              className="company-information"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
            >
              <option value="Remote">Remote</option>
              <option value="United_States">United States</option>
              <option value="California">California</option>
            </select>
          </div>
          <div class="form-control">
            <label className="label-description">Date</label>
            <DatePicker
              className="company-information date-picker"
              selected={dateOfSubmission}
              onChange={(date) => setDateOfSubmission(date)}
            />
          </div>
        </div>

        <div class="row">
          <div class="form-control full-span">
            <label className="label-description">Job URL</label>
            <input
              className="company-information"
              type="text"
              value={companyURL}
              onChange={(e) => setCompanyURL(e.target.value)}
              placeholder="URL"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-control full-span">
            <label className="label-description">Job Description</label>
            <textarea
              className="text-input"
              type="text"
              placeholder="Enter Job Description..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </div>
        <div className='button-area'>
            <button className="text-submit-button" onClick={submitChanges}>
              Submit Job Details
            </button>
            <button onClick={resetFields} className="text-reset-button">
              Reset Fields
            </button>
        </div>
        {errorMessage ? (
          <div className="error-description">Error: {errorMessage}</div>
        ) : (
          <DisplayParseResults wordMap={wordMap} />
        )}
      </div>

    </div>
  );
}

export default TextInput;
