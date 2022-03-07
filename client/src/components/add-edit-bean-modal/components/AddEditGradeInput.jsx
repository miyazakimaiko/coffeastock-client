import React from 'react'
import FormInput from '../../elements/FormInput';

const AddEditGradeInput = ({bean, setBean, gradeWarningText, setGradeWarningText}) => {
  const setGrade = (grade) => {
    setBean({...bean, grade});
    if (grade < 0.0 || grade > 100.0) {
      setGradeWarningText(<span className="text-red">Please enter a number between 0.0 and 100.0</span>)
    } else {
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
      onChange={e => setGrade(e.target.value)}
      warningText={gradeWarningText}
    />
  )
}

export default AddEditGradeInput