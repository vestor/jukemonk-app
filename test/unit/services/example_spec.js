'use strict';

describe('Unit: ExampleService', function() {

  let http, service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject(($httpBackend, PlayerService) => {
      http = $httpBackend;
      service = PlayerService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it('should retrieve data', function(done) {
    http.expect('GET', 'http://localhost:8001').respond(200);

    service.get().then((result) => {
      expect(result).toEqual({data: 1234});
    }).catch((error) => {
      expect(error).toBeUndefined();
    }).then(done);

    http.flush();
  });
});
