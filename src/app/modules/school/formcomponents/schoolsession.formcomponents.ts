export const schoolsessionFormComponents = {
	formId: 'schoolsession',
	title: 'Session',
	components: [
		{
			name: 'Date',
			key: 'start',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill session start'
				},
				{
					name: 'Label',
					value: 'Date start'
				}
			]
		},
		{
			name: 'Date',
			key: 'end',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill session end'
				},
				{
					name: 'Label',
					value: 'Date end'
				}
			]
		}
	]
};
