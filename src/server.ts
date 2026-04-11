import app from "@/app";
import { ENV } from "@/config/env";

const serverStart = () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log("-----------------------------------------------------");
      console.log(`${ENV.APP_NAME} is running successfully!`);
      console.log("URL: ", ENV.BACKEND_URL);
      console.log("Port: ", ENV.PORT);
      console.log("Environment: ", ENV.NODE_ENV);
      console.log("Timestamp: ", new Date().toISOString());
      console.log("-----------------------------------------------------");
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
}

serverStart();