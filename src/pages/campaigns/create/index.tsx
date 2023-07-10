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
import { createCampaign } from 'apiSdk/campaigns';
import { Error } from 'components/error';
import { campaignValidationSchema } from 'validationSchema/campaigns';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CreatorInterface } from 'interfaces/creator';
import { getCreators } from 'apiSdk/creators';
import { CampaignInterface } from 'interfaces/campaign';

function CampaignCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CampaignInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCampaign(values);
      resetForm();
      router.push('/campaigns');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CampaignInterface>({
    initialValues: {
      name: '',
      start_date: new Date(new Date().toDateString()),
      end_date: new Date(new Date().toDateString()),
      creator_id: (router.query.creator_id as string) ?? null,
    },
    validationSchema: campaignValidationSchema,
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
            Create Campaign
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
          <FormControl id="start_date" mb="4">
            <FormLabel>Start Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.start_date ? new Date(formik.values?.start_date) : null}
                onChange={(value: Date) => formik.setFieldValue('start_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="end_date" mb="4">
            <FormLabel>End Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.end_date ? new Date(formik.values?.end_date) : null}
                onChange={(value: Date) => formik.setFieldValue('end_date', value)}
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
    entity: 'campaign',
    operation: AccessOperationEnum.CREATE,
  }),
)(CampaignCreatePage);
