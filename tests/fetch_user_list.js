import { KakaoWork } from '../dist/kakaowork.js';


const client = new KakaoWork('3eeff251.b48efc82d9ca4cf5aef2c0089f370a6d');
client.fetch_user_list().then(x => console.dir(x));
