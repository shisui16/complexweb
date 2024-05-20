$(document).ready(function() {
  // Smooth Scrolling for internal links
  $('a[href^="#"]').on("click", function(e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $("html, body").stop().animate({
          scrollTop: $target.offset().top
      }, 900, 'swing', function() {
          window.location.hash = target;
      });
  });

  // Change background of nav bar on scroll
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll > window.innerHeight - 55) {
          $(".navbar").removeClass("transparent");
      } else {
          $(".navbar").addClass("transparent");
      }
  });

  // Activate scrollspy to highlight nav item when scrolled over
  $('body').scrollspy({ target: ".navbar" });

  // Bind events to open and close portfolio popups
  $(".thumbnail-overlay").on("click", openProject.bind(this));
  $(".close-window").on("click", closeWindow.bind(this));

  function openProject(event) {
      var id;
      if ($(event.target).next(".thumbnail-overlay").length) {
          id = "#" + $(event.target).parent().attr("page");
      } else {
          id = "#" + $(event.target).attr("page");
      }
      $(id).fadeIn();
  }

  function closeWindow(event) {
      $(event.target).parents(".full-screen").fadeOut();
  }

  // Network animation with vis.js
  const nodes = new vis.DataSet([
      {
          id: 1,
          label: 'Person 1',
          image: 'Unknown_person.jpg',
          info: 'Person 1 description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus eu justo vehicula iaculis nec sit amet leo.'
      },
      {
          id: 2,
          label: 'Person 2',
          image: 'Unknown_person.jpg',
          info: 'Person 2 description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus eu justo vehicula iaculis nec sit amet leo.'
      },
      {
          id: 3,
          label: 'Person 3',
          image: 'Unknown_person.jpg',
          info: 'Person 3 description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus eu justo vehicula iaculis nec sit amet leo.'
      },
      {
          id: 4,
          label: 'Person 4',
          image: 'Unknown_person.jpg',
          info: 'Person 4 description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus eu justo vehicula iaculis nec sit amet leo.'
      },
      {
          id: 5,
          label: 'Person 5',
          image: 'Unknown_person.jpg',
          info: 'Person 5 description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus eu justo vehicula iaculis nec sit amet leo.'
      }
  ]);

  const edges = new vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 }
  ]);

  const container = document.getElementById('network');
  const data = { nodes: nodes, edges: edges };
  const options = {
      nodes: {
          shape: 'circularImage',
          size: 60,
          font: {
              size: 20,
              face: 'Tahoma'
          }
      },
      physics: {
          enabled: true,
          solver: 'barnesHut',
          barnesHut: {
              gravitationalConstant: -2000,
              centralGravity: 0.3,
              springLength: 200,
              springConstant: 0.04,
              damping: 0.09
          },
          stabilization: {
              iterations: 1000
          },
          minVelocity: 0.75,
          maxVelocity: 10,
          timestep: 0.5,
          bounce: true
      },
      interaction: {
          hover: true
      }
  };

  const network = new vis.Network(container, data, options);

  // Add event listener for node clicks
  network.on("click", function(params) {
      if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = nodes.get(nodeId);
          $('#nodeModalLabel').text(node.label);
          $('#nodeModalBody').html('<img src="' + node.image + '" style="width: 100px; height: 100px; border-radius: 50%;"><br>' + node.info);
          $('#nodeModal').modal('show');
      }
  });
});
