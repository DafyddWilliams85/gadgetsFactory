db.getCollection("employee").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			 organization_id:ObjectId("5bcd9bf3ede2f43ded73dd62"),
			    
			}
		},

		// Stage 2
		{
			$lookup: {
			        from: 'employee_cost',
			        as: 'employee_cost',
			        let: { employee_id: '$_id' },
			        pipeline: [
			          {
			            $match: {
			              $expr: {
			                $and: [
			                  { $eq: ['$employee_id', '$$employee_id'] },
			                   { $gte: ['$year', 2017] },
			                   { $lte: ['$year', 2021] },
			                ]
			              }
			            }
			          }
			        ]
			      }
		},

		// Stage 3
		{
			$lookup: {
			        from: 'members',
			        as: 'members',
			        let: { employee_id: '$_id' },
			        pipeline: [
			          {
			            $match: {
			              $expr: {
			                $and: [
			                  { $eq: ['$employee_id', '$$employee_id'] },
			                  { $eq: ['$record_type', 'membership'] },  
			                ]
			              }
			            }
			          }
			        ]
			      }
		},

		// Stage 4
		{
			$unwind: {
			    path : "$members",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 5
		{
			$project: {
			   _id : "$_id",
			   first_name:"$first_name",
			    last_name:"$last_name",
			     staff_number:"$staff_number",
			     employee_cost:"$employee_cost",
			     "members.items":{ "$filter" : {
			               input: "$members.items",
			               as: "item",
			               // "$and":[{year: {"$gte" : 2017 }},{year:{"$lte" : 2021 }}],
			               cond:{$and: [ { $gte: [ "$$item.year", 2017 ] }, { $lte: [ "$$item.year", 2021 ] }]}
			            },
			       }
			}
		},

		// Stage 6
		{
			$group: {
			        _id: "$_id",
			       first_name:{"$first":"$first_name"},
			    last_name:{"$first":"$last_name"},
			     staff_number:{"$first":"$staff_number"},
			     employee_cost:{"$first":"$employee_cost"},
			     "members":{"$push": "$members"}
			}
		},

		// Stage 7
		{
			$lookup: {
			        from: 'employee_department_involvement',
			        as: 'employee_department_involvement',
			        let: { employee_id: '$_id' },
			        pipeline: [
			          {
			            $match: {
			              $expr: {
			                $and: [
			                  { $eq: ['$employee_id', '$$employee_id'] },
			                 
			                 { $gte: [ "$year", 2017 ] }, 
			                 { $lte: [ "$year", 2021 ] }
			                ]
			              }
			            }
			          }
			        ]
			      }
		},

		// Stage 8
		{
			$lookup: {
			        from: 'employee_involvement',
			        as: 'employee_involvement',
			        let: { employee_id: '$_id' },
			        pipeline: [
			          {
			            $match: {
			              $expr: {
			                $and: [
			                   { $eq: ['$employee_id', '$$employee_id'] },
			                   { $lte: ['$start_date', ISODate("2021-01-01T00:00:00.000+0000")] },
			//                   { $gte: ['$start_date', ISODate("2018-01-01T00:00:00.000+0000")] },
			                ]
			                
			              }
			            }
			          }
			        ]
			      }
		},

		// Stage 9
		{
			$unwind: {
			    path : "$employee_involvement",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : false // optional
			}
		},

		// Stage 10
		{
			$lookup: // Equality Match
			{
			    from: "settings",
			    localField: "employee_involvement.employee_type",
			    foreignField: "_id",
			    as: "employee_involvement.employeeTypeData"
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

		// Stage 11
		{
			$unwind: {
			    path : "$employee_involvement.employeeTypeData",
			    includeArrayIndex : "arrayIndex", // optional
			    preserveNullAndEmptyArrays : true // optional
			}
		},

		// Stage 12
		{
			$sort: {"employee_involvement.start_date": -1},
		},

		// Stage 13
		{
			$group: {
			    _id: "$_id",
			    first_name:{"$first":"$first_name"},
			    last_name:{"$first":"$last_name"},
			     staff_number:{"$first":"$staff_number"},
			     employee_cost:{"$first":"$employee_cost"},
			     "members":{"$first": "$members"},
			     all_employee_involvement:{"$push":"$employee_involvement"},
			     employee_involvement:{"$first":"$employee_involvement"},
			     employee_department_involvement:{"$first":"$employee_department_involvement"},
			     
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
