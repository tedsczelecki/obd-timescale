const Post = require('./model');
const { success, redirect} = require('../responses');

const noop = (val) => val;
const getNumValue = (num) => {
  const _num = parseFloat(num);
  console.log(num, _num);
  if (Number.isNaN(_num)) {
    return null;
  }
  return _num;
}
const getDBValue = (val, modifierFunc = getNumValue) => {
  return !val || val === 'NODATA' ? null : modifierFunc(val);
};

const getAll = async (req, res) => {
  console.log('GETTT');
  const result = await Post.query()
    .select(
      'time',
      'vin',
      'latitude',
      'longitude',
      'altitude',
      'engine_rpm',
      'speed',
      'throttle_pos',
    )
    .where(
    'time',
    '>',
    '2019-09-26 01:54:10.727000 +00:00',
  );
  success(res, result);
}

const create = async (req, res) => {
  console.log(req.body);

  const {
    altitude,
    latitude,
    longitude,
    readings,
    timestamp,
  } = req.body;

  if (!readings) {
    success(res, 'No readings');
  }

  const {
    ENGINE_RPM, // '736RPM'
    SPEED,
    BAROMETRIC_PRESSURE, //'100kPa',
    WIDEBAND_AIR_FUEL_RATIO, //: 'NODATA',
    THROTTLE_POS, //: '11.8%',
    FUEL_PRESSURE, //: 'NODATA',
    FUEL_RAIL_PRESSURE, //: 'NODATA',
    ENGINE_OIL_TEMP, //: 'NODATA',
    AIR_INTAKE_TEMP, //: '43C',
    AIR_FUEL_RATIO, //: '14.70:1 AFR',
    FUEL_LEVEL, //: '69.8%',
    TIMING_ADVANCE, //: '60.0%',
    AMBIENT_AIR_TEMP, //: '',
    ENGINE_RUNTIME, //: '00:05:27',
    CONTROL_MODULE_VOLTAGE, //: '14.0V',
    VIN: vin = '', //: '1C4HJWEGXFL514955',
    ENGINE_LOAD, //: '24.3%',
    FUEL_CONSUMPTION_RATE, //: 'NODATA',
    INTAKE_MANIFOLD_PRESSURE, //: '33kPa'
  } = readings;

  const time = new Date(timestamp);
  const engine_rpm = getDBValue(ENGINE_RPM);
  const speed = getDBValue(SPEED);
  const barometric_pressure = getDBValue(BAROMETRIC_PRESSURE);
  const wideband_air_fuel_ratio = getDBValue(WIDEBAND_AIR_FUEL_RATIO);
  const throttle_pos = getDBValue(THROTTLE_POS);
  const fuel_pressure = getDBValue(FUEL_PRESSURE);
  const fuel_rail_pressure = getDBValue(FUEL_RAIL_PRESSURE);
  const engine_oil_temp = getDBValue(ENGINE_OIL_TEMP);
  const air_intake_temp = getDBValue(AIR_INTAKE_TEMP);
  const air_fuel_ratio = getDBValue(AIR_FUEL_RATIO, noop);
  const fuel_level_pct = getDBValue(FUEL_LEVEL);
  const timing_advance = getDBValue(TIMING_ADVANCE);
  const ambient_air_temp = getDBValue(AMBIENT_AIR_TEMP);
  const engine_runtime = getDBValue(ENGINE_RUNTIME, noop);
  const control_module_voltage = getDBValue(CONTROL_MODULE_VOLTAGE);
  const engine_load = getDBValue(ENGINE_LOAD);
  const fuel_consumption_rate = getDBValue(FUEL_CONSUMPTION_RATE);
  const intake_manifold_pressure = getDBValue(INTAKE_MANIFOLD_PRESSURE);
  const raw = JSON.stringify(req.body);

  const post = await Post.query().insert({
      time,
      vin,
      latitude,
      longitude,
      altitude,
      engine_rpm,
      speed,
      barometric_pressure,
      wideband_air_fuel_ratio,
      throttle_pos,
      fuel_pressure,
      fuel_rail_pressure,
      engine_oil_temp,
      air_intake_temp,
      air_fuel_ratio,
      fuel_level_pct,
      timing_advance,
      ambient_air_temp,
      engine_runtime,
      control_module_voltage,
      engine_load,
      fuel_consumption_rate,
      intake_manifold_pressure,
      raw,
    })
  success(res, post);
};

module.exports = {
  create,
  getAll,
};
