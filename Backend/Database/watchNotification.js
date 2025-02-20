

const watchNotifications = async (Model, modelName) => {

    const changeStream = Model.watch([
      {
        $match: {
          "operationType": "update"
        },
      },
    ]);
  
    changeStream.on("change", (change) => {
  
        if (change.updateDescription.updatedFields.notifications) {
            const userId = change.documentKey._id.toString();
            const newNotifications = change.updateDescription.updatedFields.notifications;
      
            // Emit real-time update to the specific user
            if (connectedClients[userId]) {
              io.to(connectedClients[userId]).emit("notification", newNotifications);
              console.log(`Sent notification update to user ${userId}`);
            }
          }

     
    });
  
    changeStream.on("error", (error) => {
      console.error(`Error in ${modelName} Change Stream:`, error);
    });
  };


  module.exports = watchNotifications