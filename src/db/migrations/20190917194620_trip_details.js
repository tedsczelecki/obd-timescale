
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE trip_details (
      time                      TIMESTAMPTZ       NOT NULL,
      vin                       TEXT              NOT NULL,
      latitude                  DOUBLE PRECISION  NULL,
      longitude                 DOUBLE PRECISION  NULL,
      altitude                  DOUBLE PRECISION  NULL,
      engine_rpm                DOUBLE PRECISION  NULL,
      speed                     DOUBLE PRECISION  NULL,
      barometric_pressure       TEXT              NULL,
      wideband_air_fuel_ratio   TEXT              NULL,
      throttle_pos              DOUBLE PRECISION  NULL,
      fuel_pressure             DOUBLE PRECISION  NULL,
      fuel_rail_pressure        DOUBLE PRECISION  NULL,
      engine_oil_temp           DOUBLE PRECISION  NULL,
      air_intake_temp           DOUBLE PRECISION  NULL,
      air_fuel_ratio            TEXT              NULL,
      fuel_level_pct            DOUBLE PRECISION  NULL,
      timing_advance            DOUBLE PRECISION  NULL,
      ambient_air_temp          DOUBLE PRECISION  NULL,
      engine_runtime            TIME              NULL,
      control_module_voltage    DOUBLE PRECISION  NULL,
      engine_load               DOUBLE PRECISION  NULL,
      fuel_consumption_rate     DOUBLE PRECISION  NULL,
      intake_manifold_pressure  DOUBLE PRECISION  NULL,
      raw                       JSONB             NULL,
      id                        INTEGER           NULL
    );
    SELECT create_hypertable('trip_details', 'time');
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    DROP TABLE IF EXISTS trip_details;
  `);
};
