
export const inputs = {
    page1 : [
        {
            label: 'First name', 
            type: 'text',
            name: 'firstName',
            value:'',
            validate:true,
            validations:{
                required:true,
                minLength:2,
                alphaNumeric:true
            },
            error:'',
        },
        {
            label: 'Last name', 
            type: 'text',
            name: 'lastName',
            value:'',
            validate:true,
            validations:{
                required:true,
                minLength:2,
                alphaNumeric:true
            },
            error:'',
        }
    ],
    page3: [
        {
            label: "Yes, I'm looking for jobs.",
            type: 'radio',
            name : 'role',
            value:2
        },
        {
            label: "No, I'm not looking for jobs.",
            type: 'radio',
            name : 'role',
            validate:true,
            value:1,
            error: ''
        }
    ]

};

export const selects = {
    page1: [
        {
            name: 'city',
            value:'',
            error:'',
            validate:true,
            validations:{
                required:true
            }
        }
    ], 
    page3: [
        {
            name: 'profession',
            label: 'Profession',
            value:'',
            error:'',
            validate:true,
            validations:{
                required:true
            },
            options: ['','Carpenter ','Electrician','Mechanic','Painter','Plumber','Tailor','Bricklayer','Window cleaner','Cleaner', 'other']
        },
        {
            name: 'experience',
            label: 'Experience',
            value:'',
            error:'',
            validate:true,
            validations:{
                required:true
            },
            options: ['','none', '1-2 years', '2-3 years', '3-4 years', '5 and more years']
        }
    ]
};

export const buttons = [{
    page1: [
        {
            label: 'Cancel', 
            style:{
                backgroundColor: '#ccc',   
            }
        },
        {
            label: 'Next', 
            style:{
                backgroundColor: '#08c982'  
            }
        }
    ]
}]