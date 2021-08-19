db.getCollection("transactions").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			  "organization_id":ObjectId("5bcd9bf3ede2f43ded73dd62"),
			  "timing_type" : "timing_expected",
			  "accounting_type" : "value_credit", 
			  "$and" : [
			                    { 
			                        "start_date" : { 
			                            "$gte" : ISODate("2017-01-01T00:00:00.000+0000")
			                        }
			                    }, 
			                    { 
			                        "start_date" : { 
			                            "$lte" : ISODate("2021-01-01T00:00:00.000+0000")
			                        }
			                    }
			                ]
			   
			}
		},

		// Stage 2
		{
			$lookup: {
			    from: "settings",
			    localField: "category_id",
			    foreignField: "_id",
			    as: "catData"
			}
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
			$match: {
			  "catData.calculation_type":"year"
			}
		},

		// Stage 5
		{
			$project: {
			  start_date:"$start_date",
			  _id:"$_id",
			  approved_amount:"$approved_amount"
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
