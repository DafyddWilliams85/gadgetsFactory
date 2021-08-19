db.getCollection("organization_transactions").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			  organization_id:ObjectId("5bcd9bf3ede2f43ded73dd62"),
			  
			  "$and":[{year: {"$gte" : 2017 }},{year:{"$lte" : 2021 }}],
			  type:{"$ne":"UniversityContribution"}
			  
			    
			}
		},

		// Stage 2
		{
			$lookup: // Equality Match
			{
			    from: "settings",
			    localField: "cat_id",
			    foreignField: "_id",
			    as: "catData"
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
			    path : "$catData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 4
		{
			$lookup: // Equality Match
			{
			    from: "settings",
			    localField: "subcat_id",
			    foreignField: "_id",
			    as: "subCatData"
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

		// Stage 5
		{
			$unwind: {
			    path : "$subCatData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 6
		{
			$lookup: // Equality Match
			{
			    from: "settings",
			    localField: "catData.department",
			    foreignField: "_id",
			    as: "catData.departmentData"
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

		// Stage 7
		{
			$unwind: {
			    path : "$catData.departmentData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 8
		{
			$group: {
			    _id:"$_id",
			    amount: {"$first":"$amount"},
			    year: {"$first":"$year"},
			    type: {"$first":"$type"},
			    subCatName: {"$first":"$subCatData.name"},
			    catName: {"$first":"$catData.name"},
			    department: {"$first":"$catData.departmentData.name"},
			    departmentId: {"$first":"$catData.departmentData._id"},
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
