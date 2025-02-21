

const watchNotifications = async (Model, modelName,io,connectedClients) => {

    const changeStream = Model.watch([
      {
        $match: {
          "operationType": "update"
        },
      },
    ]);
  
    changeStream.on("change", (change) => {
      
      const updatedFields = change.updateDescription.updatedFields;
      const notificationUpdated = Object.keys(updatedFields).some(field => field.startsWith("notifications"));
      
    
      if (notificationUpdated) {
          const userId = change.documentKey._id.toString();
           
      
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