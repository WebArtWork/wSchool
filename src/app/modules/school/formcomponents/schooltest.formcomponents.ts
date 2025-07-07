export const schooltestFormComponents = {
	formId: 'schooltest',
	title: 'Schooltest',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill tests title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill tests description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Number',
			key: 'duration',
			fields: [
				{
					name: 'Placeholder',
					value: 'set tests duration'
				},
				{
					name: 'Label',
					value: 'Duration'
				}
			]
		}
	]
};
