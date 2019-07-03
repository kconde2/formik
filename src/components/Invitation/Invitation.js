import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { EditorState } from "draft-js";
import RichTextEditor from './RichTextEditor.js';

import "./Invitation.css";

const initialValues = {
  friends: [
    {
      name: "",
      email: ""
    }
  ],
  editorState: new EditorState.createEmpty(),
}

const Invitation = () => (
  <div className="InvitationBox">
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        friends: Yup.array().of(Yup.object({
          name: Yup.string().required('Required *'),
          email: Yup.string().email('Invalid email!').required('Required *')
        }))
      })}
      onSubmit={values => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >

      {({ values, errors, touched, handleBlur, isSubmitting, setFieldValue }) => (
        <Form>
          {/* <RichTextEditor
            editorState={values.editorState}
            onChange={setFieldValue}
            onBlur={handleBlur}
            /> */}
          <FieldArray name="friends">
            {({ push, remove }) => <>
              {values.friends &&
                values.friends.length > 0 &&
                values.friends.map((friend, index) =>
                  <div key={index} className="Inputs row">
                    <div className="Field col">
                      <Field name={`friends[${index}].name`}>
                        {({ field, form }) => (
                          <input {...field} value={friend.name} type="text" placeholder="Kaba CONDE" />
                        )}
                      </Field>
                      <ErrorMessage name={`friends[${index}].name`}>
                        {msg => <div className="field-error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="Field col">
                      <Field name={`friends[${index}].email`} value={friend.email} type="email" placeholder="kabaconde@example.com" />

                      <ErrorMessage name={`friends[${index}].email`}>
                        {msg => <div className="field-error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="Button">
                      <button
                        type="button"
                        onClick={() => remove(index)}>X</button>
                    </div>
                  </div>
                )}
              <div className="Actions">
                <button
                  type="button"
                  className="Add"
                  onClick={() => push({ name: '', email: '' })}>
                  Add Friend
                </button>
              </div>

              <div className="Actions">
                <button type="submit" className="Invite" disabled={isSubmitting}>Invite</button>
              </div>
            </>
            }
          </FieldArray>
        </Form>
      )}
    </Formik>
  </div>
);

export default Invitation;
