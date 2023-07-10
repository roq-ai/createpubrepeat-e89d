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
import { createSubscription } from 'apiSdk/subscriptions';
import { Error } from 'components/error';
import { subscriptionValidationSchema } from 'validationSchema/subscriptions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CreatorInterface } from 'interfaces/creator';
import { getCreators } from 'apiSdk/creators';
import { SubscriptionInterface } from 'interfaces/subscription';

function SubscriptionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SubscriptionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSubscription(values);
      resetForm();
      router.push('/subscriptions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SubscriptionInterface>({
    initialValues: {
      service_name: '',
      subscription_date: new Date(new Date().toDateString()),
      creator_id: (router.query.creator_id as string) ?? null,
    },
    validationSchema: subscriptionValidationSchema,
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
            Create Subscription
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="service_name" mb="4" isInvalid={!!formik.errors?.service_name}>
            <FormLabel>Service Name</FormLabel>
            <Input type="text" name="service_name" value={formik.values?.service_name} onChange={formik.handleChange} />
            {formik.errors.service_name && <FormErrorMessage>{formik.errors?.service_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="subscription_date" mb="4">
            <FormLabel>Subscription Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.subscription_date ? new Date(formik.values?.subscription_date) : null}
                onChange={(value: Date) => formik.setFieldValue('subscription_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
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
    entity: 'subscription',
    operation: AccessOperationEnum.CREATE,
  }),
)(SubscriptionCreatePage);
