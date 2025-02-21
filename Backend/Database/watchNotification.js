

const watchNotifications = async (Model, modelName,io,connectedClients) => {

    const changeStream = Model.watch([
      {
        $match: {
          "operationType": "update"
        },
      },
    ]);
  
    changeStream.on("change", (change) => {
  console.log("ghjk");
  
        if (change.updateDescription.updatedFields) {
            const userId = change.documentKey._id.toString();
      
            // Emit real-time update to the specific user
            if (connectedClients[userId]) {
              io.to(connectedClients[userId]).emit("notification", "jajja");
              console.log(`Sent notification update to user ${userId}`);
            }
          }

     
    });
  
    changeStream.on("error", (error) => {
      console.error(`Error in ${modelName} Change Stream:`, error);
    });
  };


  module.exports = watchNotifications