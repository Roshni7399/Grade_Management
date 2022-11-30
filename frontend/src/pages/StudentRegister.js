import React from "react";
import '../pages/Sr.css'

export default function StudentRegister() {
  return (
    <div>
      <div class="col-md-4 col-md-offset-4" id="login">
        <section id="inner-wrapper" class="login">
          <article>
            <form>
              <div class="form-group">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-envelope"> </i>
                  </span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-key"> </i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-key"> </i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-success btn-block">
                Submit
              </button>
            </form>
          </article>
        </section>
      </div>
    </div>
  );
}
