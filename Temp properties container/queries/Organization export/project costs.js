db.getCollection("participants").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			  organization_id:ObjectId("5bcd9bf3ede2f43ded73dd62"),
			  type:"project"
			  
			 
			    
			}
		},

		// Stage 2
		{
			$lookup: //// Equality Match
			{
			    from: "projects",
			    localField: "project_id",
			    foreignField: "_id",
			    as: "projectData"
			}
		},

		// Stage 3
		{
			$unwind: {
			    path : "$projectData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 4
		{
			$match: {
			    "$and":[ {'projectData.end_date' :{"$lte": new Date('2021-01-01T00:00:00.000Z') } },
			             {'projectData.end_date' :{"$gte": new Date('2018-01-01T00:00:00.000Z') } },
			                ]
			}
		},

		// Stage 5
		{
			$lookup: {
			        from: 'members',
			        as: 'members',
			        let: { record_type : '$record_type', project_id: "$project_id" }, 
			        pipeline: [
			          {
			            $match: {
			              $expr: {
			                $and: [
			                  { $eq: ['$project_id', '$$project_id'] },
			                  { $eq: ['$record_type','membership' ] },
			                ]
			              }
			            }
			          }
			        ]
			      }
		},

		// Stage 6
		{
			$lookup: {
			        from: 'transactions',
			        as: 'transactions',
			        let: { organization_id: '$organization_id', project_id: "$project_id" },
			        pipeline: [
			          {
			            $match: {
			              $expr: {
			                $and: [
			                  { $eq: ['$project_id', '$$project_id'] },
			                  { $eq: ['$organization_id','$$organization_id' ] },
			                  { $eq: ['$timing_type','timing_expected' ] },
			                ]
			              }
			            }
			          }
			        ]
			      }
		},

		// Stage 7
		{
			$unwind: {
			    path : "$members",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 8
		{
			$project: {
			   _id : "$_id",
			   project_id : "$project_id",
			   end_date : "$projectData.end_date",
			   department : "$projectData.Department",
			   organization_id : "$organization_id",
			   membersItems :  "$members.items",
			   transactions : "$transactions"
			    
			}
		},

		// Stage 9
		{
			$unwind: {
			    path : "$transactions",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : true // optional
			}
		},

		// Stage 10
		{
			$group: {
			    _id: "$_id",
			   project_id             : {"$first": "$project_id"},
			   end_date               : {"$first":"$end_date"},
			   organization_id        : {"$first":"$organization_id"},
			   department             : {"$first":"$department"},
			   membersItems           : {"$first":"$membersItems"},
			   'creditTransactions': { 
			                '$sum': {
			                    '$cond': [
			                        { '$eq': [ "$transactions.accounting_type" ,"value_credit", ]}, 
			                        '$Sentiment', 
			                        "$transactions.approved_amount"
			                    ]
			                }
			            },
			     'debitTransactions': { 
			                '$sum': {
			                    '$cond': [
			                        { '$eq': [ "$transactions.accounting_type" ,"value_debit", ]}, 
			                        '$Sentiment', 
			                        "$transactions.approved_amount"
			                    ]
			                }
			            },
			}
		},

		// Stage 11
		{
			$unwind: {
			    path : "$membersItems",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : true // optional
			}
		},

		// Stage 12
		{
			$group: {
			   _id                    : "$project_id",
			   end_date               : {"$first":"$end_date"},
			   department             : {"$first":"$department"},
			   creditTransactions     : {"$sum":"$creditTransactions"},
			   debitTransactions      : {"$sum":"$debitTransactions"},
			   memberCost             : {  '$sum': "$membersItems.employee_sal_cost_fte_benefits"},
			
			}
		},

		// Stage 13
		{
			$lookup: // Equality Match
			{
			    from: "settings",
			    localField: "department",
			    foreignField: "_id",
			    as: "departmentData"
			}
		},

		// Stage 14
		{
			$unwind: {
			    path : "$departmentData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : true // optional
			}
		},

		// Stage 15
		{
			$project: {
			  _id: "$_id",
			   end_date               : "$end_date",
			   creditTransactions     : "$creditTransactions",
			   debitTransactions      : "$debitTransactions",
			   memberCost             : "$memberCost",
			   department             : "$departmentData.name",
			    
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
