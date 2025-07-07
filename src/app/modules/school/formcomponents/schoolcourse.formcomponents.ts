export const schoolcourseFormComponents = {
	formId: 'schoolcourse',
	title: 'Schoolcourse',
	components: [
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Label',
					value: 'Photo'
				}
			]
		},
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill course title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill course description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Select',
			key: 'requiredCourse',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Select required сourse'
				},
				{
					name: 'Label',
					value: 'Required Course'
				},
				{
					name: 'Multiple',
					value: true
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Select',
			key: 'suggestedCourse',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Select suggested сourse'
				},
				{
					name: 'Label',
					value: 'Suggested Course'
				},
				{
					name: 'Multiple',
					value: true
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Number',
			key: 'duration',
			fields: [
				{
					name: 'Placeholder',
					value: 'set course duration'
				},
				{
					name: 'Label',
					value: 'Duration'
				}
			]
		},
		{
			name: 'Number',
			key: 'cost',
			fields: [
				{
					name: 'Placeholder',
					value: 'set course cost'
				},
				{
					name: 'Label',
					value: 'Cost'
				}
			]
		},
		{
			name: 'Tags',
			key: 'learning',
			fields: [
				{
					name: 'Button',
					value: 'Add what we are learning'
				},
				{
					name: 'Placeholder',
					value: 'fill learnings'
				},
				{
					name: 'Label',
					value: 'What student will learn'
				}
			]
		},
		{
			name: 'Tags',
			key: 'included',
			fields: [
				{
					name: 'Button',
					value: 'Add what is included'
				},
				{
					name: 'Placeholder',
					value: 'fill included'
				},
				{
					name: 'Label',
					value: 'Included'
				}
			]
		},
		{
			name: 'Tags',
			key: 'requirements',
			fields: [
				{
					name: 'Button',
					value: 'Add what is required to know'
				},
				{
					name: 'Placeholder',
					value: 'fill requirements'
				},
				{
					name: 'Label',
					value: 'Requirements'
				}
			]
		},
		{
			name: 'Select',
			key: 'status',
			fields: [
				{
					name: 'Items',
					value: ['Active', 'Inactive']
				},
				{
					name: 'Placeholder',
					value: 'choose course status'
				},
				{
					name: 'Label',
					value: 'Status'
				},
				{
					name: 'Multiple',
					value: false
				}
			]
		},
		{
			name: 'Select',
			key: 'knowledge',
			hidden: true,
			fields: [
				{
					name: 'Items',
					value: []
				},
				{
					name: 'Placeholder',
					value: 'choose course knowledge'
				},
				{
					name: 'Label',
					value: 'Knowledge'
				},
				{
					name: 'Name',
					value: 'title'
				}
			]
		}
	]
};
