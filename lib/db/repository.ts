import { PoolConfig } from "pg";
import mng_psql from "./mng_psql";

const psqlCrdl:PoolConfig={
  connectionString:"postgres://uploader_shkv_user:5dq8C67d0Im8EdtjGn4PgRSvuZHshfzp@frankfurt-postgres.render.com/uploader_shkv",
  ssl:true,
  max:20,
  
}

const pql =new mng_psql(psqlCrdl);

export default pql;