import React, { useState } from 'react'
import FormInput from '../../../elements/FormInput';

const GradeInput = ({bean, setBean}) => {
  const [warning, setWarning] = useState({
    invalid: false,
    message: "",
  });

  const setGrade = (grade) => {
    if (grade.length === 0) {
      setBean({...bean, grade: null});
      resetWarning();
    }
    else {
      setBean({...bean, grade});

      const valueIsNumber = checkValueIsNumber(grade);
  
      if (!valueIsNumber) {
        
        setWarning({
          ...warning,
          invalid: true,
          message: <span className="text-red">
            Value must be a number.
          </span>
        });
      }
      else {
        const gradeIsInRange = checkNumberIsInRange(grade);
  
        if (!gradeIsInRange) {

          setWarning({
            ...warning,
            invalid: true,
            message: <span className="text-red">
              Please enter a number between 0.0 and 100.0.
            </span> 
          });
        }
        else {
          resetWarning();
        }
      }
    }
  }

  const checkValueIsNumber = (grade) => {
    const includesForbiddenChar = ["e", "E", "+", "-"].includes(grade);
    return !isNaN(grade) && !includesForbiddenChar;
  }

  const checkNumberIsInRange = (grade) => {
    return grade >= 0.0 && grade <= 100.0;
  }

  const resetWarning = () => {
    setWarning({
      ...warning,
      invalid: false,
      message: "",
    });
  }

  return (
    <FormInput
      title="Grade (0.0 - 100.0)"
      type="text"
      name="grade"
      placeholder="e.g. 85.5"
      value={bean.grade}
      invalid={warning.invalid}
      onChange={e => setGrade(e.target.value)}
      warningText={warning.message}
    />
  )
}

export default GradeInput