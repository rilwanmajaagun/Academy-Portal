const request = require("supertest");
const app = require("../index");
const assert = require("assert");

const agent = request(app);

describe("Testing my Academy api", (done) => {
	it("it should get the base url", (done) => {
		agent.get("/")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});

	it("get all batch", (done) => {
		agent.get("/api/v1/getBatch")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.body.code, 200);
				assert.equal(
					res.body.status,
					"success"
				);
				assert.equal(
					res.body.message,
					"Success fetching all batch"
				);
				done();
			});
	});

	it("get Total", (done) => {
		agent.get("/api/v1/getTotal")
			.set("Accept", "application/json")
			.set("token", "cjhhchchcgcgcgx")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);

				done();
			});
	});

	it("sign up user", (done) => {
		agent.post("/api/v1/signup")
			.set("Accept", "application/json")
			.send({
				first_name: "rilwan",
				last_name: "kolade",
				email_address:
					"majaagunoyinkolade9@gmail.com",
				phone_number: "08160248617",
				password: "majaagun30",
				password_confirmation: "majaagun30",
			})
			.expect("Content-Type", /json/)
			.expect(409)
			.end((err, res) => {
				if (err)
					return done(
						assert.equal(
							res.body
								.message,
							"User Already Exists"
						)
					);

				done();
			});
	});

	it("login user", (done) => {
		agent.post("/api/v1/login")
			.set("Accept", "application/json")
			.send({
				email_address:
					"majaagunoyinkolade@gmail.com",
				password: "majaagun30",
			})
			.expect("Content-Type", /json/)
			.expect(202)
			.end((err, res) => {
				if (err) return done(err);
				assert.deepEqual(res.body, {
					message: "login successful",
					first_name:
						data.result
							.first_name,
					last_name:
						data.result
							.last_name,
				});
			});
		done();
	});

	it("get update", (done) => {
		agent.get("/api/v1/getUpdate")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.body, data.result);
				done();
			});
	});
});
