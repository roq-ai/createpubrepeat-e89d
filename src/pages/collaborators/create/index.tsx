import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCollaborator } from 'apiSdk/collaborators';
import { Error } from 'components/error';
import { collaboratorValidationSchema } from 'validationSchema/collaborators';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CreatorInterface } from 'interfaces/creator';
import { UserInterface } from 'interfaces/user';
import { getCreators } from 'apiSdk/creators';
import { getUsers } from 'apiSdk/users';
import { CollaboratorInterface } from 'interfaces/collaborator';

function CollaboratorCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CollaboratorInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCollaborator(values);
      resetForm();
      router.push('/collaborators');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CollaboratorInterface>({
    initialValues: {
      name: '',
      creator_id: (router.query.creator_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: collaboratorValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Collaborator
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CreatorInterface>
            formik={formik}
            name={'creator_id'}
            label={'Select Creator'}
            placeholder={'Select Creator'}
            fetcher={getCreators}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'collaborator',
    operation: AccessOperationEnum.CREATE,
  }),
)(CollaboratorCreatePage);
