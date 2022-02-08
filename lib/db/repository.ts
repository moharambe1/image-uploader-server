import { PoolConfig } from "pg";
import mng_psql from "./mng_psql";

const psqlCrdl:PoolConfig={
  connectionString:process.env.PG_CONNECT_STRING || null,
  ssl:process.env.PG_SSL==="true" || true,
  max:parseInt(process.env.PG_MAX)||20,
  host:process.env.PG_HOST||null,
  database:process.env.PG_DATABASE||null,
  user:process.env.PG_USER||null,
  password:process.env.PG_PASSWORD||null,

  
}

const pql =new mng_psql(psqlCrdl);

export default pql;