      var templates = {
        form: "<div class='form'><input /><ol></ol><button class='add-question'>Add question</button></div>",
        question: "<li><input /><a class='remove-question' href='javascript:void(0)'>x</a></li>",
        workflow: "<div class='workflow'><div class='start'><span class='title'>Start Form</span></div><div class='middle'><span class='title'>Other Forms</span></div></div>",
      };
      var dropForm = function(event, ui) {
        var $form = $(ui.draggable);
        $form.css("top", 0);
        $form.css("left", 0);
        $(this).append($form);
      };
      $(document).ready(function() {
        $(".toolbar-icon-form").click(function() {
          var $form = $(templates.form);
          $form.find("input").val("Form " + ($(".form").length + 1));
          $form.draggable({ revert: true });
          $("#workspace").append($form);
        });
        $(".toolbar-icon-workflow").click(function() {
          var $workflow = $(templates.workflow);
          $workflow.find(".middle").droppable({
            accept: ".form",
            drop: dropForm,
          });
          $workflow.find(".start").droppable({
            accept: ".form",
            drop: dropForm,
          });
          $("#workspace").append($workflow);
        });
        $(document).on("click", ".add-question", function() {
          $(this).closest(".form").find("ol").append($(templates.question));
        });
        $(document).on("click", ".remove-question", function() {
          $(this).closest("li").remove();
        });
      });
