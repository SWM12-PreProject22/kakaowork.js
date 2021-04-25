import { KakaoWork } from '../dist/index';


const client = new KakaoWork(process.env.KAKAOWORK_BOT_API_TOKEN);
client.fetchUserList().then(x => console.dir(x));
