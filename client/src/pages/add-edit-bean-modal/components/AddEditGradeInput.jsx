import React, { useState } from 'react'
import FormInput from '../../../components/elements/FormInput';

const AddEditGradeInput = ({bean, setBean}) => {

  const [gradeWarningText, setGradeWarningText] = useState("");

  const setGrade = (grade) => {
    const gradeWithinRange = grade >= 0.0 && grade <= 100.0
    if (!gradeWithinRange) {
      setGradeWarningText(<span className="text-red">Please enter a number between 0.0 and 100.0</span>)
    }
    else {
      if (grade.length === 0) {
        grade = null
      }
      setBean({...bean, grade});
      setGradeWarningText("")
    }
  }

  return (
    <FormInput
      title="Grade (0.0 - 100.0)"
      type="number"
      step="0.1"
      name="grade"
      placeholder="e.g. 85.5"
      value={bean.grade}
      onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
      onChange={e => setGrade(e.target.value)}
      warningText={gradeWarningText}
    />
  )
}

export default AddEditGradeInput