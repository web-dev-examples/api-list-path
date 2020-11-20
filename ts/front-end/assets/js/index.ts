'use strict';


interface httpPOST_Configurations {
  url: string,
  body: string,
  headers: Headers,
}


/**
 * Sends new POST request, then returns fetch response or error Promise
 * @example
 *   httpPOST({
 *     url: 'http://localhost:8080/route',
 *     headers: {
 *       'content-type': 'application/x-www-form-urlencoded',
 *     }
 *     body: 'key=value',
 *   }).then((response) => {
 *     return response.json();
 *   }).then((response_json) => {
 *     console.log('response_json ->', JSON.stringify(response_json, null, 2));
 *   }).catch((error) => {
 *     console.error(error);
 *   });
 * @see {link} https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see {link} https://stackoverflow.com/questions/6432693/post-data-with-request-module-on-node-js
 */
async function httpPOST({url, body, headers}: httpPOST_Configurations): Promise<Response> {
  const request: Request = new Request(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  return fetch(request).then((response: Response) => {
    if ((response.status < 200) || (response.status > 299)) {
      throw new Error(`Error response status -> ${response.status}`);
    }
    return response;
  }).catch((error) => {
    throw error;
  });
}


/**
 * Callback function for HTML button that issues POST request
 * @example HTML
 *   <input id="client-input" type="text" value=".">
 *
 *   <input for="client-input"
 *          data-output-id="service-output"
 *          data-api-url="http://localhost:8080/list"
 *          id="POST-button"
 *          type="button"
 *          value="Request">
 *
 *   <pre id="service-output"></pre>
 *
 * @see {link} https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
 * @see {link} https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
 */
const callback__submit_button = (event: Event) => {
  const event_target = <HTMLInputElement>event.target;

  // ID of element, and element, where client input value is provided
  const for_id: (string | null) = event_target.getAttribute('for');
  if (!for_id) {
    throw new Error('No "for" attribute found on event.target');
  }

  const client_input_element = <HTMLInputElement>document.getElementById(for_id);
  if (!client_input_element) {
    throw new Error(`No HTML element found with id -> ${for_id}`);
  } else if (!(client_input_element instanceof HTMLInputElement)) {
    throw new Error(`HTML element with id "${for_id}" is not a HTMLInputElement`);
  }

  // ID of element, and element, where service output is written
  const data_output_id: (string | null) = event_target.getAttribute('data-output-id');
  if (!data_output_id) {
    throw new Error('No "data-output-id" attribute found on event.target');
  }

  const service_output_element = <HTMLInputElement>document.getElementById(data_output_id);
  if (!service_output_element) {
    throw new Error(`No HTML element found with id -> ${data_output_id}`);
  } else if (!(service_output_element instanceof HTMLPreElement)) {
    throw new Error(`HTML element with id "${data_output_id}" is not a HTMLPreElement`);
  }

  // URL to send POST request
  const data_api_url: (string | null) = event_target.getAttribute('data-api-url');
  if (!data_api_url) {
    throw new Error('No "data-api-url" attribute found on event.target');
  }

  const headers: Headers = new Headers({
    'content-type': 'application/x-www-form-urlencoded',
  });

  httpPOST({
    url: data_api_url,
    headers: headers,
    body: `path=${encodeURIComponent(client_input_element.value)}`,
  }).then((response: Response) => {
    return response.json();
  }).then((response_json: JSON) => {
    service_output_element.innerText = JSON.stringify(response_json, null, 2);
  }).catch((error: Error) => {
    service_output_element.innerText = error.message;
    console.error(error);
  });
};


/**
 * Code to execute after page is fully loaded
 */
window.addEventListener('load', () => {
  const submit_button_element = <HTMLInputElement>document.getElementById('POST-button');
  submit_button_element.addEventListener('click', callback__submit_button)
});

