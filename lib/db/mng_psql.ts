import { Pool, PoolConfig, QueryConfig } from "pg";


class mng_psql {
  m_pool: Pool;
  m_credential: () => PoolConfig;
  constructor(crodential :()=>PoolConfig) {
    this.m_credential = crodential;
    this.init();

  }
  async init(): Promise<void> {
    this.m_pool = new Pool(this.m_credential());

    try {
      await this.m_pool.connect();
      console.error("connecting to Postgress DataBase name " + this.m_credential().database + " successfully");
    } catch (err) {
      console.error("Cant connect to Postgres database :" + err.message);
      console.log("reconnecting to Postgress Database in 5s");
      console.log(this.m_credential());
      setTimeout(this.init.bind(this),5000);
    }
  };

  async getPhoto(imageId: number): Promise<Buffer> {
    let data: Buffer;
    try {
      const res = (await this.m_pool.query("SELECT imgdata FROM images WHERE imageId=$1", [imageId]));
      data=res.rows[0].imgdata;
    } catch (err) {
      console.error("Error in reading image from dataBase :" + err.message);
    }
    return data;
  }
  async savePhoto(imageId: number, data: Buffer): Promise<void> {
   
    try{
      await this.m_pool.query("INSERT INTO images(imageId, imgData) VALUES ($1, $2)", [imageId, data])

    }catch(err){
      console.error("Error in saving file to dataBase :" + err.message);
      return ;
    }
    return
  }

}

export default mng_psql;