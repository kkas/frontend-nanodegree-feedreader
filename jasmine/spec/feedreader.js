/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have feeds in which a URL is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have feeds in which a name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('has a single .entry element within the .feed container',
            function(done) {
                expect($('.feed .entry').length).toBeGreaterThan(0);
                done();
            }
        );

        /*
         * (My additional test)
         * Test that ensures the number of the feed returned from the API is
         * less than or equals to the number that the user has selected.
         * This test ensures the functionality of building the parameters to
         * the API call with the specified number.
         * Though this test assumes that the API works correctly.
         */
        it('have less or equals to the number of feeds that the user has ' +
            'selected', function(done) {
            expect(numFeedsToDisplay).toBeDefined();
            expect($('.feed').children().length).toBe(numFeedsToDisplay);
            done();
        });

        /* (My additional test) */
        describe('for handling API call errors', function() {
            /*
             * Insert a wrong name and a URL into allFeeds
             */
            beforeAll(function() {
                allFeeds.push({
                    name: 'Test',
                    url: 'htttp://thisistest.com/'
                });
            });

            /*
             * Make a API call with the wrong URL to receive an error.
             */
            beforeEach(function(done) {
                loadFeed(allFeeds.length - 1, function() {
                    done();
                });
            });

            /*
             * Remove the name and the URL inserted for this test.
             */
            afterAll(function() {
                allFeeds.pop();
            });

            /*
             * Test that a error message is displayed in the div which
             * has a 'error' class.
             */
            it('display an error message when the API returned an error',
                function(done) {
                    expect($('.error').text()).not.toBe('');
                    done();
                }
            );
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var txtBefore,
            headerTitleBefore;

        beforeEach(function(done) {
            loadFeed(0, function() {
                txtBefore = $('.entry:first').text();
                headerTitleBefore = $('.header-title').text();
                done();
            });
        });

        afterEach(function() {
            // Reset the selected feed.
            loadFeed(0);
        });

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes the content when a new feed is loaded ' +
            'by the loadFeed function', function(done) {

            loadFeed(1, function() {
                expect(txtBefore).not.toBe($('.entry:first').text());
                done();
            });
        });

        /*
         * (My additional test)
         */
        it('change the header title when a new feed is loaded', function(done) {
            loadFeed(1, function() {
                expect(headerTitleBefore).not.toBe($('.header-title').text());
                done();
            });
        });
    });
}());
