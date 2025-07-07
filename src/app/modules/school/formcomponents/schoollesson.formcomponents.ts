export const schoollessonFormComponents = {
	formId: 'schoollesson',
	title: 'Schoollesson',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill schoollesson title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'shortDescription',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill lesson short description'
				},
				{
					name: 'Label',
					value: 'Short description'
				}
			]
		},
		{
			name: 'Html',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill schoollesson description'
				},
				{
					name: 'Label',
					value: 'Description'
				},
				{
					name: 'Textarea',
					value: true
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill schoollesson description'
				},
				{
					name: 'Label',
					value: 'Description'
				},
				{
					name: 'Textarea',
					value: true
				}
			]
		},
		{
			name: 'Tags',
			key: 'links',
			fields: [
				{
					name: 'Placeholder',
					value: 'add lessons links'
				},
				{
					name: 'Label',
					value: 'Links'
				}
			]
		}
	]
};
