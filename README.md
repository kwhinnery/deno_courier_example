# Deno Courier Example

This example shows how to schedule future notifications in a Deno server
application using the [Courier API](https://www.courier.com/). This application
is intended to be run in production using
[Deno Deploy](https://www.deno.com/deploy), but can be used in any
[environment that runs Deno](https://docs.deno.com/runtime/manual/advanced/deploying_deno/).

## Signing up for Courier

To send out email notifications from this example app, you'll need a
[Courier account](https://www.courier.com/). During signup, they will prompt you
to connect your Gmail account to send email for testing purposes. If you
complete this onboarding step, you should be all set to send out some test
emails.

## Local development

Copy the `.env.example` file to `.env` and configure your
[Courier API token](https://app.courier.com/settings/api-keys). After doing
this, you can start the development server with:

```
deno task dev
```

Visit [http://localhost:8000](http://localhost:8000) and add an email address
and order text in the form. This will schedule a notification to be delivered
five seconds in the future using the
[queue API](https://deno.land/api?unstable=true&s=Deno.Kv&p=prototype.enqueue).

## Run in production on Deno Deploy

Add your fork of this sample project (or a new copy of it) to your GitHub
account. In the [new project wizard](https://dash.deno.com/new), choose to
import an existing GitHub repository, and choose this one.

![Deno Deploy Dashboard](https://github.com/kwhinnery/deno_courier_example/assets/29193/c7966281-7f22-4c80-9dbe-8936c877c25a)

After deploying, you'll need to update your project settings with a
`COURIER_API_TOKEN`, much as you did in the local `.env` file. This should be
all the configuration that's necessary - the demo should work just as it did
locally.

![image](https://github.com/kwhinnery/deno_courier_example/assets/29193/76d743d1-23e5-4942-8f11-0e9baa936750)

## License

MIT
