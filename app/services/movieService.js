var MockMovieService = function() {
  return {
      search: function(searchText) {
          //TODO:
          return [
            {
                Title: "Armaghedon",
                Year: 1994
            }
          ];
      }
  };
}