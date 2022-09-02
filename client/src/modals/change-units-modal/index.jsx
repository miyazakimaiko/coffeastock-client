import React, { useContext, useEffect, useState } from 'react';
import { ModalStateContext } from '../../context/ModalStateContext';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import FormMultiSelect from '../../elements/FormMultiSelect';
import useEditUserUnitIds from '../../hooks/useEditUserUnitIds';
import useUnits from '../../hooks/useUnits';
import useUserUnitIds from '../../hooks/useUserUnitIds';


const ChangeUnitsModal = () => {
  const { closeModal } = useContext(ModalStateContext);
  const editUserUnitIds = useEditUserUnitIds();
  const { data: units, 
          isLoading: unitsAreLoading 
        } = useUnits();
  const { data: userUnitIds, 
          isLoading: userUnitIdsAreLoading 
        } = useUserUnitIds();

  const [solidWeightUnit, setSolidWeightUnit] = useState({});
  const [fluidWeightUnit, setFluidWeightUnit] = useState({});
  const [temperatureUnit, setTemperatureUnit] = useState({});

  useEffect(() => {
    if (units) {
      setSolidWeightUnit(units['solid' + userUnitIds.unit_solid_weight_id]);
      setFluidWeightUnit(units['fluid' + userUnitIds.unit_fluid_weight_id]);
      setTemperatureUnit(units['temp' + userUnitIds.unit_temperature_id]);
    }
  }, [])


  function changeUnits(e) {
    e.preventDefault();

    const newUserUnitIds = {
      unit_solid_weight_id: solidWeightUnit.id,
      unit_fluid_weight_id: fluidWeightUnit.id,
      unit_temperature_id: temperatureUnit.id,
    };

    editUserUnitIds.mutate(newUserUnitIds, {
      onSuccess: () => closeModal()
    });
  }

  if (unitsAreLoading || userUnitIdsAreLoading) {
    return 'Loading...';
  }

  return (
    <>
      <ModalWrapperContainer
        onCloseClick={closeModal}
        title="Change Coffee/Recipe Units"
      >
        <div className="card-content px-6 pb-6 justify-center">
          <form onSubmit={(e) => changeUnits(e)}>
            <div className="card-content w-80 mx-auto">
              <div className="pb-6">
                <FormMultiSelect
                  title="Volume weight unit"
                  options={Object.values(units).filter(unit => {
                    if (unit.type === 'solid') {
                      // create value attr with unique id which is required for multiselect
                      unit.value = unit.type + unit.id;
                      console.log({unit})
                      return unit;
                    };
                  })}
                  isMulti={false}
                  isCreatable={false}
                  value={solidWeightUnit}
                  onChange={setSolidWeightUnit}
                />
              </div>
              <div className="pb-6">
                <FormMultiSelect
                  title="Fluid weight unit"
                  options={Object.values(units).filter(unit => {
                    if (unit.type === 'fluid') {
                      // create value attr with unique id which is required for multiselect
                      unit.value = unit.type + unit.id;
                      return unit;
                    };
                  })}
                  isMulti={false}
                  isCreatable={false}
                  value={fluidWeightUnit}
                  onChange={setFluidWeightUnit}
                />
              </div>
              <div className="pb-6">
                <FormMultiSelect
                  title="Temperature unit"
                  options={Object.values(units).filter(unit => {
                    if (unit.type === 'temp') {
                      // create value attr with unique id which is required for multiselect
                      unit.value = unit.type + unit.id;
                      return unit;
                    };
                  })}
                  isMulti={false}
                  isCreatable={false}
                  value={temperatureUnit}
                  onChange={setTemperatureUnit}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button 
                type="submit"
                disabled={false}
                className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
              >
                <span className="ml-1">Save</span>
              </button>
            </div>
          </form>
        </div>
      </ModalWrapperContainer>
    </>
  )
}

export default ChangeUnitsModal