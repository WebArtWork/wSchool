export const schoolcertificateFormComponents = {
	formId: 'schoolcertificate',
	title: 'Schoolcertificate',
	components: [
		{
			name: 'Text',
			key: 'title',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill certificates title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Date',
			key: 'received',
			fields: [
				{
					name: 'Placeholder',
					value: 'set receiving date'
				},
				{
					name: 'Label',
					value: 'Received'
				}
			]
		},
		{
			name: 'Number',
			key: 'grade',
			fields: [
				{
					name: 'Placeholder',
					value: 'set certificates grade'
				},
				{
					name: 'Label',
					value: 'Grade'
				}
			]
		},
		{
			name: 'Date',
			key: 'expired',
			fields: [
				{
					name: 'Placeholder',
					value: 'set expiration date'
				},
				{
					name: 'Label',
					value: 'Expired'
				}
			]
		},
		{
			name: 'Select',
			key: 'status',
			fields: [
				{
					name: 'Items',
					value: ['Pending', 'Received', 'Expired']
				},
				{
					name: 'Placeholder',
					value: 'choose certificates status'
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
		}
	]
};
