This section lists the errors common to the API of all Al Ahly Momkn services.

| Error Type              | Description                                                                                 | HTTP Status Code |
|-------------------------|---------------------------------------------------------------------------------------------|------------------|
| `BadRequestException`   | The submitted request is not valid (e.g., missing or incorrect input). See the error message for details. | `400`            |
| `ConflictException`     | The request configuration has conflicts. Refer to the error message for details.            | `409`            |
| `LimitExceededException`| The request exceeded the rate limit. Retry after the specified time.                        | `429`            |
| `TooManyRequestsException` | The request reached its throttling limit. Retry after the specified time.               | `429`            |
| `UnauthorizedException` | The request is denied due to insufficient permissions.                                      | `401`            |