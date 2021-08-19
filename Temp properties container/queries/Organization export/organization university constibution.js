db.getCollection("organization_transactions").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			  organization_id:ObjectId("5bcd9bf3ede2f43ded73dd62"),
			  "$and":[{year: {"$gte" : 2017 }},{year:{"$lte" : 2021 }}],
			  type:{"$eq":"UniversityContribution"}
			  
			    
			}
		},

		// Stage 2
		{
			$lookup: // Equality Match
			{
			    from: "settings",
			    localField: "settings_id",
			    foreignField: "_id",
			    as: "settingsData"
			}
			
			// Uncorrelated Subqueries
			// (supported as of MongoDB 3.6)
			// {
			//    from: "<collection to join>",
			//    let: { <var_1>: <expression>, …, <var_n>: <expression> },
			//    pipeline: [ <pipeline to execute on the collection to join> ],
			//    as: "<output array field>"
			// }
		},

		// Stage 3
		{
			$unwind: {
			    path : "$settingsData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : true // optional
			}
		},

		// Stage 4
		{
			$group: {
			    _id: "$year",
			    data :{"$push":{
			        values:"$values",
			        settingsId: "$settingsData._id",
			        settingsName: "$settingsData.name",
			        subtype: "$subtype",
			        
			    },}
			  
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
