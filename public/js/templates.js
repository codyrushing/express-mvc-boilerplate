this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n    <h1>Home</h1>\n";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <p>yeah "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</p>\n";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.showTitle), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<!-- Calls `foo` helper, overridden at render-level. -->\n<p>";
  if (helper = helpers.foo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.foo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n<!-- Calls `bar` helper, defined at instance-level. -->\n<p>";
  if (helper = helpers.bar) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.bar); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n<p>";
  stack1 = self.invokePartial(partials.test1, 'test1', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n\n";
  stack1 = (helper = helpers.eachLimit || (depth0 && depth0.eachLimit),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.arr), 5, options) : helperMissing.call(depth0, "eachLimit", (depth0 && depth0.arr), 5, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = (helper = helpers.getPartialByName || (depth0 && depth0.getPartialByName),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.partialName), (depth0 && depth0.data), options) : helperMissing.call(depth0, "getPartialByName", (depth0 && depth0.partialName), (depth0 && depth0.data), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["Handlebars"]["templates"]["main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "\n	    <link rel=\"stylesheet\" type=\"text/css\" href=\"public/css/style.css\" />\n    ";
  }

function program3(depth0,data) {
  
  
  return "\n	    <link rel=\"stylesheet\" type=\"text/css\" href=\"public/css/style.min.css\" />\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n	<script type=\"text/javascript\" src=\"public/js/lib/handlebars.runtime-v1.3.0.js\"></script>\n	<script type=\"text/javascript\" src=\"public/js/templates.js\"></script>\n	<script type=\"text/javascript\" src=\"public/js/helpers.js\"></script>\n";
  }

function program7(depth0,data) {
  
  
  return "\n	<script type=\"text/javascript\" src=\"public/js/build/express-boilerplate.min.js\"></script>\n";
  }

  buffer += "<!doctype html>\n<html>\n<head>\n    <meta charset=\"utf-8\" />\n    <title>Example App - Home</title>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.debug), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</head>\n<body>\n\n";
  if (helper = helpers.body) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.body); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.debug), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</body>\n</html>";
  return buffer;
  });

this["Handlebars"]["templates"]["test1"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "here is test partial 1";
  });

this["Handlebars"]["templates"]["test2"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "here is test partial 2";
  });