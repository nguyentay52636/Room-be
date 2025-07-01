/**
 * @swagger
 * /api/v1/user/updateUser/{id}:
 *  get:
 *      description: responses
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
* /api/v1/user/updateUser/{id}:
 *  delete:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: headers
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *      responses:
 *          200:
 *              description: res
 */