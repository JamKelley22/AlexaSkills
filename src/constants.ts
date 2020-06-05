export const MAX_HISTORY_SIZE = 20; // remember only latest 20 intents

const { env } = process;

const envLoadError = (envVar: string) =>
  `Could not load ${envVar} env variable`;

let error: Error | null = null;
export const PORT = env.PORT;
if (!PORT) error = new Error(envLoadError("PORT"));
export const APP_ID = env.APP_ID;
if (!APP_ID) new Error(envLoadError("APP_ID"));
export const CERT_DIR = env.CERT_DIR;
if (!CERT_DIR) new Error(envLoadError("CERT_DIR"));
export const BASE_ENDPOINT = env.BASE_ENDPOINT;
if (!BASE_ENDPOINT) new Error(envLoadError("BASE_ENDPOINT"));

if (error) {
  //Should just quit application here
  throw error;
}

export const WelcomeCardImg = {
  smallImageUrl:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fd20-dice-dungeons-dragons-2699387%2F&psig=AOvVaw3ySccOfzxiUBUhPf7FV2n8&ust=1590757950687000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiSmafR1ukCFQAAAAAdAAAAABAD",
  largeImageUrl:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fd20-dice-dungeons-dragons-2699387%2F&psig=AOvVaw3ySccOfzxiUBUhPf7FV2n8&ust=1590757950687000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiSmafR1ukCFQAAAAAdAAAAABAD",
};

// export const DisplayImg1 = {
//     title: 'Jet Plane',
//     url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png'
// };
// export const DisplayImg2 = {
//     title: 'Starry Sky',
//     url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png'
// };
