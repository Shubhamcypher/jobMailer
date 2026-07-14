import app from "./app.js";
import { startScheduler,recoverCampaign } from "./services/scheduleService.js";

const PORT = process.env.PORT || 5000;

startScheduler();
recoverCampaign();

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});