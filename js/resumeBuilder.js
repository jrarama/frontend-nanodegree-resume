function getHtml(template, value, placeholder) {
	return template.replace(placeholder || '%data%', value);
}

function setData($elem, templateValueMap, placeholder) {
	var html = '';
	$.each(templateValueMap, function(template, value) {
		var values = $.isArray(value) ? value : [value];
		var p = placeholder || '%data%';
		var tmpl = window[template];

		$.each(values, function() {
			html += getHtml(tmpl, this, p);
		});
	});
	$elem.append(html);
}

var bio = {
	name: 'Joshua Rarama',
	role: 'Web Developer',
	contacts: {
		mobile: '650-555-5555',
		email: 'joshua@example.com',
		github: 'jrarama@github.com',
		twitter: '@joshua',
		location: 'Singapore'
	},
	welcomeMessage: 'Welcome to my online resume',
	skills: [
		'awesomeness', 'programming', 'saving the universe'
	],
	bioPic: 'images/fry.jpg',
	display: function() {
		setData($('#header'), {
			'HTMLheaderName': bio.name,
			'HTMLheaderRole': bio.role,
			'HTMLbioPic': bio.bioPic,
			'HTMLwelcomeMsg': bio.welcomeMessage
		});

		if ((bio.skills || []).length > 0) {
			$('#header').append(HTMLskillsStart);
			setData($('#skills'), {
				'HTMLskills': bio.skills
			});
		}

		var contacts = bio.contacts;
		setData($('#topContacts'), {
			'HTMLmobile': contacts.mobile,
			'HTMLemail': contacts.email,
			'HTMLtwitter': contacts.twitter,
			'HTMLgithub': contacts.github,
			'HTMLlocation': contacts.location
		});

		$('#footerContacts').html($('#topContacts').html());
	}
};

var work = {
	jobs: [
		{
			employer: 'Optimum Solutions',
			title: 'Application Consultant',
			dates: 'December 2015 - Present',
			location: 'Singapore',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			employer: 'Salarium',
			title: 'Senior Software Engineer',
			dates: 'July 2014 - Nov 2014',
			location: 'Makati, Philippines',
			description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		},
		{
			employer: 'Travelfast International',
			title: 'IT Head',
			dates: 'April 2012 - July 2014',
			location: 'Makati, Philippines',
			description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
		}
	],
	display: function() {
		$.each(work.jobs || [], function(j, job) {
			var $elem = $(HTMLworkStart);
			setData($elem, {
				'HTMLworkEmployer': job.employer,
				'HTMLworkTitle': job.title,
				'HTMLworkDates': job.dates,
				'HTMLworkLocation': job.location,
				'HTMLworkDescription': job.description
			});
			$('#workExperience').append($elem);
		});
	}
};

var projects = {
	projects: [
		{
			title: 'Spotify Streamer',
			dates: '2015',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
			images: ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg']
		},
		{
			title: 'JS Games',
			dates: '2015',
			description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
			images: ['images/image3.jpg', 'images/image4.jpg', 'images/image1.jpg']
		}
	],
	display: function() {
		$.each(projects.projects || [], function(p, project) {
			var $elem = $(HTMLprojectStart);
			setData($elem, {
				'HTMLprojectTitle': project.title,
				'HTMLprojectDates': project.dates,
				'HTMLprojectDescription': project.description,
				'HTMLprojectImage': project.images
			});
			$('#projects').append($elem);
		});
	}
};

var education = {
	schools: [
		{
			name: 'STI College Baguio',
			location: 'Baguio, Philippines',
			degree: 'BS',
			date: 2012,
			majors: ['Computer Engineering'],
			url: 'http://www.sti.edu/campuses.asp?campus_id=21'
		},
		{
			name: 'STI College San Jose',
			location: 'San Jose City, N.E., Philippines',
			degree: 'Diploma',
			date: 2008,
			majors: ['Computer and Electronics'],
			url: 'http://www.sti.edu/campuses.asp?campus_id=39'
		}
	],
	onlineCourses: [
		{
			title: 'Front-End Web Developer',
			school: 'Udacity',
			date: 2015,
			url: 'https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001'
		},
		{
			title: 'Android Developer',
			school: 'Udacity',
			date: 2015,
			url: 'https://www.udacity.com/course/android-developer-nanodegree--nd801'
		}
	],
	display: function() {
		$.each(education.schools || [], function(s, school) {
			var $elem = $(HTMLschoolStart);
			setData($elem, {
				'HTMLschoolName': school.name,
				'HTMLschoolDegree': school.degree,
				'HTMLschoolDates': school.date,
				'HTMLschoolLocation': school.location,
				'HTMLschoolMajor': school.majors
			});
			$('#education').append($elem);
		});

		var onlineCourses = education.onlineCourses || [];
		if (onlineCourses.length > 0) {
			$('#education').append(HTMLonlineClasses);
			var $elem = $(HTMLschoolStart);
			$.each(onlineCourses, function(c, course) {
				setData($elem, {
					'HTMLonlineTitle': course.title,
					'HTMLonlineSchool': course.school,
					'HTMLonlineDates': course.date,
					'HTMLonlineURL': course.url
				});
			});
			$('#education').append($elem);
		}
	}
};

function displayMap() {
	$('#mapDiv').append(googleMap);
	initializeMap();

	// Vanilla JS way to listen for resizing of the window
	// and adjust map bounds
	$(window).resize(function(e) {
	  //Make sure the map bounds get updated on page resize
	  map.fitBounds(mapBounds);
	});
}

function hideEmptySections() {
	if(document.getElementsByClassName('flex-item').length === 0) {
        document.getElementById('topContacts').style.display = 'none';
    }
    if(document.getElementsByTagName('h1').length === 0) {
        document.getElementById('header').style.display = 'none';
    }
    if(document.getElementsByClassName('work-entry').length === 0) {
        document.getElementById('workExperience').style.display = 'none';
    }
    if(document.getElementsByClassName('project-entry').length === 0) {
        document.getElementById('projects').style.display = 'none';
    }
    if(document.getElementsByClassName('education-entry').length === 0) {
        document.getElementById('education').style.display = 'none';
    }
    if(document.getElementsByClassName('flex-item').length === 0) {
        document.getElementById('lets-connect').style.display = 'none';
    }
    if(document.getElementById('map') === null) {
        document.getElementById('mapDiv').style.display = 'none';
    }
}

// Document ready event
$(function() {
	bio.display();
	work.display();
	projects.display();
	education.display();
	displayMap();
	hideEmptySections();
});